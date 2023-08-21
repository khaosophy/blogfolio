declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"astro-review.md": {
	id: "astro-review.md";
  slug: "astro-review";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"codepen-react-template.md": {
	id: "codepen-react-template.md";
  slug: "codepen-react-template";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"const-not-always-constant.md": {
	id: "const-not-always-constant.md";
  slug: "const-not-always-constant";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"disable-xmlrpc-wordpress.md": {
	id: "disable-xmlrpc-wordpress.md";
  slug: "disable-xmlrpc-wordpress";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"gatsby-page-redirect.md": {
	id: "gatsby-page-redirect.md";
  slug: "gatsby-page-redirect";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"gatsby-wordpress-custom-post-types.md": {
	id: "gatsby-wordpress-custom-post-types.md";
  slug: "gatsby-wordpress-custom-post-types";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"how-to-secure-the-wordpress-admin.md": {
	id: "how-to-secure-the-wordpress-admin.md";
  slug: "how-to-secure-the-wordpress-admin";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"intro-interaction-media-queries.md": {
	id: "intro-interaction-media-queries.md";
  slug: "intro-interaction-media-queries";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"jamstack-virtual-2020.md": {
	id: "jamstack-virtual-2020.md";
  slug: "jamstack-virtual-2020";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"must-use-plugins.md": {
	id: "must-use-plugins.md";
  slug: "must-use-plugins";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"password-autocomplete-user-frustration-security.md": {
	id: "password-autocomplete-user-frustration-security.md";
  slug: "password-autocomplete-user-frustration-security";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"prl-framework-review.md": {
	id: "prl-framework-review.md";
  slug: "prl-framework-review";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"reset-button-clear-form.md": {
	id: "reset-button-clear-form.md";
  slug: "reset-button-clear-form";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"sort-astro-glob.md": {
	id: "sort-astro-glob.md";
  slug: "sort-astro-glob";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"three-things-every-website-needs.md": {
	id: "three-things-every-website-needs.md";
  slug: "three-things-every-website-needs";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"windows-shortcuts.md": {
	id: "windows-shortcuts.md";
  slug: "windows-shortcuts";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
};
"code-samples": {
"google-maps-directions-api.md": {
	id: "google-maps-directions-api.md";
  slug: "google-maps-directions-api";
  body: string;
  collection: "code-samples";
  data: any
} & { render(): Render[".md"] };
"interactive-calculator.md": {
	id: "interactive-calculator.md";
  slug: "interactive-calculator";
  body: string;
  collection: "code-samples";
  data: any
} & { render(): Render[".md"] };
"react-quantity-stepping.md": {
	id: "react-quantity-stepping.md";
  slug: "react-quantity-stepping";
  body: string;
  collection: "code-samples";
  data: any
} & { render(): Render[".md"] };
};
"commendations": {
"engine-of-innovation/index.md": {
	id: "engine-of-innovation/index.md";
  slug: "engine-of-innovation";
  body: string;
  collection: "commendations";
  data: any
} & { render(): Render[".md"] };
"kind/index.md": {
	id: "kind/index.md";
  slug: "kind";
  body: string;
  collection: "commendations";
  data: any
} & { render(): Render[".md"] };
"philomath/index.md": {
	id: "philomath/index.md";
  slug: "philomath";
  body: string;
  collection: "commendations";
  data: any
} & { render(): Render[".md"] };
"tenacious/index.md": {
	id: "tenacious/index.md";
  slug: "tenacious";
  body: string;
  collection: "commendations";
  data: any
} & { render(): Render[".md"] };
};
"speaker-sessions": {
"must-use-plugins/index.md": {
	id: "must-use-plugins/index.md";
  slug: "must-use-plugins";
  body: string;
  collection: "speaker-sessions";
  data: any
} & { render(): Render[".md"] };
"wordpress-admin-security/index.md": {
	id: "wordpress-admin-security/index.md";
  slug: "wordpress-admin-security";
  body: string;
  collection: "speaker-sessions";
  data: any
} & { render(): Render[".md"] };
"wordpress-gatsby-static-site/index.md": {
	id: "wordpress-gatsby-static-site/index.md";
  slug: "wordpress-gatsby-static-site";
  body: string;
  collection: "speaker-sessions";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
