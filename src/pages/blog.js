import { useEffect } from 'react';
import { navigate } from 'gatsby';

const BlogRedirect = () => {
  useEffect(() => {
    navigate('/');
  }, []);
  return null;
};

export default BlogRedirect;