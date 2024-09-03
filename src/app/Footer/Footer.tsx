import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-gray-200 py-12 px-4 md:px-6 m-auto">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="grid gap-2">
          <span className="text-lg font-semibold">Services</span>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Branding
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Design
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Marketing
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Advertisement
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-lg font-semibold">Company</h4>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            About Us
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Contact
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Jobs
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Contact
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-lg font-semibold">Resources</h4>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Legal
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms of Use
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Cookies Policy
          </Link>
        </div>
      </div>
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href={"https://x.com/gurdittcancode"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
           gurdittcancode
          </a>
          . The source code is available on{" "}
          <a
            href={"https://github.com/gurdittcancode/bleepkart-ecommerce"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
