import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo({ height = 200, width = 200 }) {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      <Image
        src={logo}
        height={height}
        width={width}
        alt="The Wild Oasis logo"
      />
    </Link>
  );
}

export default Logo;
