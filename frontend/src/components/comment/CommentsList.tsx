import type { CommentType } from "@/types/types";
import RateStar from "@/ui/RateStar";
import Image from "next/image";

function CommentsList({ comments }: Readonly<{ comments: CommentType[] }>) {
  return (
    <div className="gap-2 flex flex-col xl:grid xl:grid-cols-2">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="px-3 rounded-xl bg-stone-100 border border-stone-200 shadow-md"
        >
          <div className="py-2 flex items-center justify-between border-b border-stone-200">
            <div className="flex gap-2 items-center">
              <div className="relative aspect-square size-15 rounded-full overflow-hidden">
                <Image src={comment.user.cover} alt="عکس کاربر" fill />
              </div>
              <h4 className="text-lg font-medium text-stone-700">
                {comment.user.name}
              </h4>
            </div>
            <RateStar rate={comment.rate} />
          </div>
          <p className="py-3 text-stone-600">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
