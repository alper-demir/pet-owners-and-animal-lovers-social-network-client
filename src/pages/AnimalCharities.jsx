import React from 'react';

const AnimalCharities = () => {
    const animalCharities = [
        {
            name: 'World Wildlife Fund (WWF)',
            website: 'https://www.worldwildlife.org/',
            description: 'World Wildlife Fund (WWF) is an international non-governmental organization working to protect and preserve wildlife and their habitats. WWF focuses on conservation efforts, sustainable practices, and addressing environmental issues such as climate change, habitat loss, and wildlife trafficking.',
            transparencyPolicy: 'WWF is committed to transparency and accountability in its operations. The organization publishes annual reports and financial statements, detailing how donations are used for conservation projects and administrative expenses. Additionally, WWF provides regular updates on its website and engages with stakeholders to ensure transparency in its activities.'
        },
        {
            name: 'ASPCA (American Society for the Prevention of Cruelty to Animals)',
            website: 'https://www.aspca.org/',
            description: 'The American Society for the Prevention of Cruelty to Animals (ASPCA) is a leading animal welfare organization dedicated to rescuing, rehabilitating, and rehoming animals in need. ASPCA works to prevent cruelty to animals, promote humane education, and advocate for animal welfare laws and policies.',
            transparencyPolicy: 'ASPCA is committed to transparency and accountability in its operations. The organization provides detailed financial reports and impact statements on its website, outlining how donations are used for animal rescue, medical care, adoption programs, and advocacy efforts. ASPCA also engages with donors and supporters through regular communications and updates to ensure transparency and trust.'
        },
        {
            name: 'Humane Society International',
            website: 'https://www.hsi.org/',
            description: 'Humane Society International (HSI) is a global animal protection organization working to create a more compassionate world for animals. HSI focuses on a wide range of issues, including ending animal cruelty, protecting wildlife, promoting animal-free alternatives, and advocating for stronger animal welfare laws.',
            transparencyPolicy: 'HSI is committed to transparency and accountability in its operations. The organization publishes annual reports and financial statements, providing detailed information on its programs, projects, and expenditures. HSI also engages with donors and supporters through newsletters, social media, and events to ensure transparency and foster trust.'
        },
        {
            name: 'PETA (People for the Ethical Treatment of Animals)',
            website: 'https://www.peta.org/',
            description: 'People for the Ethical Treatment of Animals (PETA) is the largest animal rights organization in the world, dedicated to ending animal exploitation and suffering. PETA works through public education, cruelty investigations, legislative advocacy, and corporate campaigns to promote animal rights and protect animals from abuse.',
            transparencyPolicy: 'PETA is committed to transparency and accountability in its operations. The organization provides detailed financial reports, impact assessments, and program evaluations on its website, demonstrating how donations are used for animal rescue, advocacy campaigns, and educational initiatives. PETA also engages with donors and supporters through regular communications and updates to ensure transparency and build trust.'
        },
        {
            name: 'The David Sheldrick Wildlife Trust',
            website: 'https://www.sheldrickwildlifetrust.org/',
            description: 'The David Sheldrick Wildlife Trust is a pioneering conservation organization dedicated to the protection and preservation of Africa\'s wildlife and habitats. The Trust focuses on wildlife rehabilitation, anti-poaching efforts, habitat conservation, and community outreach to safeguard endangered species and their ecosystems.',
            transparencyPolicy: 'The David Sheldrick Wildlife Trust is committed to transparency and accountability in its conservation efforts. The Trust provides regular updates and impact reports on its website, detailing the progress of its wildlife rehabilitation projects, anti-poaching initiatives, and community development programs. Additionally, the Trust maintains open communication channels with donors and supporters to ensure transparency and trust.'
        },
        {
            "name": "Doğa Derneği",
            "website": "https://www.dogadernegi.org/",
            "description": "Doğa Derneği is a non-governmental organization working to protect nature and biodiversity in Turkey. The association carries out projects aimed at conserving natural habitats, increasing biodiversity, and promoting sustainable development.",
            "transparencyPolicy": "Doğa Derneği follows a transparent and accountable policy regarding its activities. The association publishes detailed reports on its projects and expenditures, and maintains regular communication with donors to ensure transparency."
        },
        {
            "name": "HAYTAP (Animal Rights Federation)",
            "website": "https://www.haytap.org/",
            "description": "HAYTAP is a federation in Turkey that advocates for animal rights and works on animal welfare issues. HAYTAP is involved in protecting animals, advocating for their rights, and combating violence and abuse.",
            "transparencyPolicy": "HAYTAP conducts its activities in a transparent and accountable manner. The federation provides detailed information about its projects and expenditures, and maintains regular communication with donors to ensure transparency."
        }
    ];

    return (
        <div className="dark:bg-[#141414]p-6 rounded-lg shadow-md w-full mt-10 mb-20 max-sm:mb-28 p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white text-center">Animal Charities and Organizations</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                Here are some animal charities and organizations that work to protect and support animals around the world. Click on the links to visit their websites and learn more about their initiatives and how you can contribute to their causes.
            </p>
            {animalCharities.map((charity, index) => (
                <div key={index} className="mb-8">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">{charity.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{charity.description}</p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{charity.transparencyPolicy}</p>
                    <a href={charity.website} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">Visit Website</a>
                </div>
            ))}
        </div>
    );
};

export default AnimalCharities;
