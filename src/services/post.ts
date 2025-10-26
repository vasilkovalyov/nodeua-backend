import { PostType } from "../models/post/post-model-type";
import PostModel from "../models/post/post-model";

export async function createPostService(props: PostType) {
  const post = await new PostModel({
    ...props
  });
  await post.save();

  return {
    _id: post._id,
    message: "Post has created"
  };
}

export async function updatePostService(props: PostType) {
  const image = "";

  await PostModel.findOneAndUpdate(
    { _id: props._id },
    {
      ...props,
      image
    },
    { new: true }
  );
  return {
    message: "Post has updated"
  };
}

export async function deletePostService(id: string) {
  const post = await PostModel.deleteOne({
    _id: id
  });
  if (!post.deletedCount) {
    throw new Error("Post already delete");
  }

  return {
    message: "Post has deleted"
  };
}

export async function getPostsService(id: string) {
  const post = await PostModel.findById(id);
  return post;
}

export async function getPostService(slug: string) {
  const post = await PostModel.findOne({ slug: slug });
  return post;
}
