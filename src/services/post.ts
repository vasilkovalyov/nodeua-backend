import { PostType, PostModel } from "../models";
import { getPaginationInfo } from "../utils/pagination";

export async function createPostService(data: PostType) {
  const image = "";

  const post = await new PostModel({
    ...data,
    image
  });
  await post.save();

  return {
    _id: post._id,
    message: "Post has created"
  };
}

export async function updatePostService(data: PostType) {
  const image = "";

  await PostModel.findOneAndUpdate(
    { _id: data._id },
    {
      ...data,
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

export async function getPaginatedPostsService(size: number, page: number) {
  const total_count = await PostModel.countDocuments();
  const { nextPage, total_pages, skip_size } = getPaginationInfo(size, page, total_count);
  const posts = await PostModel.find({}, null, { sort: { createdAt: -1 } })
    .skip(skip_size)
    .limit(size)
    .exec();

  return {
    total_count,
    current_page: page,
    next_page: nextPage,
    total_pages: total_pages,
    posts
  };
}

export async function getPostService(id: string) {
  const post = await PostModel.findById(id);
  return post;
}

export async function getPostBySlugService(slug: string) {
  const post = await PostModel.findOne({ slug: slug });
  return post;
}
