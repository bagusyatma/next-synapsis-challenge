import { api } from '@/common/http';
import RootLayout from '@/components/layout/RootLayout';
import PostingForm from '@/components/ui/PostingForm';
import { cn } from '@/utils/classname';
import { getItem } from '@/utils/storage';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { LuArrowLeft } from 'react-icons/lu';
import { useMutation } from 'react-query';

export default function CreatePost() {
  const router = useRouter();
  const token = getItem('token');

  const createMutation = useMutation({
    mutationFn: (values: any) => {
      return api.post('/public/v2/posts', {}, values, { headers: { Authorization: `Bearer ${token}` } });
    },
    onSuccess: () => {
      message.success('Post created successfully');
      router.push('/');
    },
    onError: () => {
      message.error('Failed to create post');
    },
  });

  const onSubmit = (values: any) => {
    createMutation.mutate(values);
  };

  return (
    <RootLayout>
      <div
        className={cn([
          'max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl mx-auto dark:text-white space-y-8',
        ])}
      >
        <div className={cn(['flex flex-col gap-2'])}>
          <div className={cn('flex items-center gap-2')}>
            <Button type="text" size="small" onClick={() => router.back()} id="back-button">
              <LuArrowLeft className={cn('text-xl')} />
            </Button>

            <span className={cn(['text-2xl font-semibold'])}>Create Post</span>
          </div>
          <hr />
          <p className={cn(['text-sm text-gray-500'])}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>

        <PostingForm onSubmit={onSubmit} isLoading={createMutation.isLoading} mutation={createMutation} />
      </div>
    </RootLayout>
  );
}
