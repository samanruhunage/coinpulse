import Coins from '@/components/home/Coins'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  return (
    <div>
      <Coins searchParams={params} />
    </div>
  );
};

export default Page;