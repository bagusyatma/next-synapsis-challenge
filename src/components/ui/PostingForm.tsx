import { api } from '@/common/http';
import { cn } from '@/utils/classname';
import { getItem } from '@/utils/storage';
import { Button, Form, Input, Select } from 'antd';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

interface PostType {
  user_id?: number;
  title?: string;
  body?: string;
}

export default function PostingForm({
  onSubmit,
  isLoading,
  mutation,
  initialData,
}: {
  onSubmit: (values: any) => void;
  isLoading: boolean;
  mutation: any;
  initialData?: PostType;
}) {
  const token = getItem('token');
  const [form] = Form.useForm();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const { data, isLoading: isLoadingAnonymousName } = useQuery({
    queryKey: ['anonymous-name'],
    queryFn: () => {
      return api.get(
        'https://gorest.co.in/public/v2/users',
        { page: 1, per_page: 10 },
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
    },
  });

  const anonymousNameOptions =
    data?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  useEffect(() => {
    mutation.isError && setError(mutation?.error?.response?.data?.message);
  }, [mutation]);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [form, initialData]);

  return (
    <Fragment>
      <Form form={form} layout="vertical" onFinish={onSubmit} disabled={isLoading}>
        <Form.Item
          label="Anonymous Name"
          name="user_id"
          tooltip={{
            title: 'Anonymous name is used to hide your identity',
            overlayStyle: { maxWidth: 320 },
          }}
          rules={[{ required: true, message: 'Please select anonymous name' }]}
        >
          <Select
            id="select-anonymous-name"
            options={anonymousNameOptions}
            loading={isLoadingAnonymousName}
            disabled={isLoadingAnonymousName}
          />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please enter title',
            },
            {
              max: 200,
              message: 'Title must be less than 200 characters',
            },
          ]}
        >
          <Input id="title" />
        </Form.Item>
        <Form.Item
          label="Content"
          name="body"
          rules={[
            {
              required: true,
              message: 'Please enter content',
            },
            {
              max: 500,
              message: 'Content must be less than 500 characters',
            },
          ]}
        >
          <Input.TextArea id="body" rows={4} />
        </Form.Item>

        <div className={cn(['flex items-center gap-2'])}>
          <Button type="primary" htmlType="submit" loading={isLoading} id="posting-button">
            Posting
          </Button>
          <Button type="text" danger htmlType="reset" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </Form>
    </Fragment>
  );
}
