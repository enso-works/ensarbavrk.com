import { PostWithViews } from '@/lib/postsApi';
import { CalendarDays } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Eye } from 'lucide-react';

export const PostMeta = ({
  postWithViews,
}: {
  postWithViews: PostWithViews;
}) => {
  console.log(postWithViews);
  return (
    <div className="max-w-[800px] flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <CalendarDays className="h-4 w-4" />
        <span>{postWithViews.meta.publishedAt}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4" />
        <span>{postWithViews.readingTime.time}</span>
      </div>
      <div className="flex items-center gap-1">
        <Eye className="h-4 w-4" />
        <span>{postWithViews?.views?.views?.toLocaleString()} views</span>
      </div>
    </div>
  );
};
