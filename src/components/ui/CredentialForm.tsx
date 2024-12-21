import { cn } from '@/utils/classname';
import { Alert, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';

export default function CredentialForm({ onFinish, mutation }: { onFinish: (values: any) => void; mutation: any }) {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  useEffect(() => {
    mutation?.isError && setError({ ...mutation?.error?.response?.data?.message });
  }, [mutation]);

  const onSubmit = (values: any) => {
    setError(null);
    onFinish(values);
  };

  return (
    <div className={cn(['flex flex-col gap-2'])}>
      <h1 className={cn(['text-2xl'])} id="welcome-text">
        Welcome to <b className={cn(['font-black'])}>BLOG</b>
        <span className={cn(['text-primary'])}>Narsys</span>
      </h1>
      <hr />
      <p className={cn(['text-sm text-gray-500'])}>Please enter your name and token to continue.</p>
      {error && <Alert message={error || 'Error'} type="error" showIcon closable onClose={() => setError(null)} />}
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter your name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="GoRest Token"
          name="token"
          tooltip={{
            title: 'You can get the token from https://gorest.co.in/',
            overlayStyle: { maxWidth: 320 },
          }}
          rules={[
            {
              required: true,
              message: 'Please enter your token',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className={cn(['flex justify-end gap-2'])}>
          <Button type="primary" htmlType="submit" loading={mutation.isLoading} id="submit-button">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
