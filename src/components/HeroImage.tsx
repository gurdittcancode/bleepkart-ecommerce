import Image from "next/image";

export default function HeroImage() {
    return (
        <Image 
            src={'https://images.unsplash.com/photo-1462804993656-fac4ff489837?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            alt='Hero image'
            width={1000}
            height={500}
            className="w-full rounded-xl shadow-2xl my-7"
            priority
        />
    )
}