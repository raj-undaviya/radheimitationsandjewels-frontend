import ProfileHeader from "../components/profile/ProfileHeader";
import OrderHistory from "../components/profile/OrderHistory";
import PaymentMethods from "../components/profile/PaymentMethods";
import Addresses from "../components/profile/Addresses";
import QuickSettings from "../components/profile/QuickSettings";
import Breadcrumb from "../components/Breadcrumb";

export default function Profile() {
    return (
        <div className="min-h-screen bg-black text-white px-4 md:px-12 md:py-10">

            {/* ✅ Breadcrumb */}
            <div className="mb-4 overflow-x-auto">
                <Breadcrumb customLast="My Profile" />
            </div>

            <ProfileHeader />

            <div className="grid lg:grid-cols-3 gap-6 mt-6">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">
                    <OrderHistory />
                    <Addresses />
                </div>

                {/* RIGHT */}
                <div className="space-y-6">
                    <PaymentMethods />
                    <QuickSettings />
                </div>

            </div>

        </div>
    );
}