'use client';

import { useSearchParams } from "next/navigation";

const id = () => {
  const searchParams = useSearchParams();
  const current = searchParams.get('courseId')
  return <p>Course number {current}</p>;
};
export default id;
