import React from 'react';

const Terms = () => {
    return (
        <div className="max-w-3xl mx-auto mt-8 px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Terms and Policies</h2>
            <p className="text-sm text-gray-700 mb-4 text-center mt-10">
                By signing up for POALSNet, you agree to abide by the following terms and policies:
            </p>
            <div className="text-sm text-gray-700 mt-5">
                <ol className="list-decimal">
                    <li className="mb-4">
                        <span className="font-semibold">Scope of Service:</span> POALSNet is an online platform providing care and adoption services for pets. Through this platform, users can adopt pets, create adoption listings, receive care services, and access information and resources related to pets.
                    </li>
                    <li className="mb-4">
                        <span className="font-semibold">Terms of Use:</span> By using the POALSNet platform, you agree to its terms of use. These terms define your rights and responsibilities regarding the use of the platform. Violation of the terms of use may result in suspension or termination of your account.
                    </li>
                    <li className="mb-4">
                        <span className="font-semibold">Privacy Policy:</span> POALSNet implements a privacy policy to protect users' personal data. This policy determines how the information collected on the platform will be used and shared. By accepting the privacy policy, you consent to the processing of your personal data in accordance with this policy.
                    </li>
                    <li className="mb-4">
                        <span className="font-semibold">Listings and Content:</span> Listings and content published on the POALSNet platform are created and shared by users. The accuracy and reliability of this content are the responsibility of the users. Content published on the platform is expected to comply with laws and societal norms. Violation may result in the removal of relevant content or the suspension of the user's account.
                    </li>
                    <li className="mb-4">
                        <span className="font-semibold">Platform Security:</span> POALSNet takes necessary measures to ensure the security of the platform. However, users are also responsible for contributing to platform security by setting strong passwords and protecting access to their accounts. Failure to comply with account security measures may result in user liability.
                    </li>
                    <li className="mb-4">
                        <span className="font-semibold">Limitation of Liability:</span> POALSNet is not liable for any damages or losses arising from content published on the platform or users' actions. Users acknowledge that they use the platform at their own risk and that POALSNet is not responsible for disputes or their consequences between users.
                    </li>
                    <li className="mb-4">
                        <span className="font-semibold">Changes and Updates:</span> POALSNet reserves the right to update its terms of use and privacy policy from time to time. Updated terms and policies will be announced on the platform. Users are advised to regularly check for and accept these changes.
                    </li>
                    <li className="mb-4">
                        <span className="font-semibold">Conclusions and Additional Information:</span> By using POALSNet, you agree to the above rules and policies. All activities on the platform are subject to these rules and policies. For further information on the use of POALSNet, you can utilize our contact information or help resources available on the platform.
                    </li>
                </ol>
            </div>
        </div>
    );
}

export default Terms;
