import axios from 'axios';
import Image from "next/image";
import Footer from "../components/footer";
import Header from "../components/header";
import IndexMidSection from "../components/indexMidSection";

export default function Home() {

    return (
        <div className="h-screen flex flex-col justify-between bg-gray-100">
            {/* Header */}
            <Header />
            {/* IndexMidSection */}
            <IndexMidSection />
            {/* Footer */}
            <Footer />
        </div>
    )
}
