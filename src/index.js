import Resolver from "@forge/resolver";
import { storage } from "@forge/api";

const resolver = new Resolver();

resolver.define("init", async (req) => {
  const localID = req.context.localId;
  const data = await storage.get(`${localID}-blog`);
  return {
    isEditing: req.context.extension.isEditing,
    blog: data,
  };
});

resolver.define("updateBlogContext", async (req) => {
  const localID = req.context.localId;
  const blog = req.payload.blog;
  storage.set(`${localID}-blog`, blog);
  return true;
});

export const handler = resolver.getDefinitions();
