import { Button } from 'antd';

import { api } from '@/common/http';
import RootLayout from '@/components/layout/RootLayout';
import { cn } from '@/utils/classname';
import { getItem } from '@/utils/storage';
import { message } from 'antd';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { LuArrowLeft } from 'react-icons/lu';
import PostingForm from '@/components/ui/PostingForm';

export default function UpdatePost() {
  const token = getItem('token');
  const router = useRouter();
  const params = useParams();

  const { data: postData, isLoading: isLoadingPost } = useQuery({
    queryKey: ['post', params?.slug],
    queryFn: async () => {
      const response = await api.get(
        `/public/v2/posts/${params?.slug}`,
        {},
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response;
    },
    enabled: !!params?.slug,
  });

  const updateMutation = useMutation({
    mutationFn: (values: any) => {
      return api.put(`/public/v2/posts/${params?.slug}`, {}, values, { headers: { Authorization: `Bearer ${token}` } });
    },
    onSuccess: () => {
      message.success('Post updated successfully');
      router.push('/');
    },
    onError: () => {
      message.error('Failed to update post');
    },
  });

  const onSubmit = (values: any) => {
    updateMutation.mutate(values);
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

            <span className={cn(['text-2xl font-semibold'])}>Update Post</span>
          </div>
          <hr />
          <p className={cn(['text-sm text-gray-500'])}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>

        <PostingForm
          onSubmit={onSubmit}
          isLoading={updateMutation.isLoading}
          mutation={updateMutation}
          initialData={postData?.data}
        />
      </div>
    </RootLayout>
  );
}
