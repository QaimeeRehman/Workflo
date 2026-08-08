import { useRouter } from "next/navigation";

function BackButton({ className }) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={className}>
      Back
    </button>
  );
}

export default BackButton;
