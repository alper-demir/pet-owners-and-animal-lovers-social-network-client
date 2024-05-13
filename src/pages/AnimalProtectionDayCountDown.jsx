import { useState, useEffect } from 'react';

const AnimalProtectionDayCountdown = () => {
    // Date of World Animal Day (October 4th)
    const animalProtectionDay = new Date('2024-10-04T00:00:00');

    // States for remaining days, hours, minutes, and seconds
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        // Calculate time remaining until World Animal Day
        const calculateCountdown = () => {
            const now = new Date().getTime();
            const difference = animalProtectionDay - now;

            // Calculate remaining days, hours, minutes, and seconds
            const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Update the states
            setDays(remainingDays);
            setHours(remainingHours);
            setMinutes(remainingMinutes);
            setSeconds(remainingSeconds);
        };

        // Update the countdown every second
        const countdownInterval = setInterval(calculateCountdown, 1000);

        // Clean up interval on unmount
        return () => clearInterval(countdownInterval);
    }, []);

    return (
        <div className="text-center mt-10 p-8 dark:text-white max-sm:mb-20">
            <h2 className="text-2xl font-semibold mb-4">Countdown to World Animal Protection Day:</h2>
            <div className="flex justify-center items-center space-x-4 max-sm:space-x-2">
                <div className="text-xl font-semibold">{days}</div>
                <div className="text-xl font-semibold">days</div>
                <div className="text-xl font-semibold">{hours}</div>
                <div className="text-xl font-semibold">hours</div>
                <div className="text-xl font-semibold">{minutes}</div>
                <div className="text-xl font-semibold">minutes</div>
                <div className="text-xl font-semibold">{seconds}</div>
                <div className="text-xl font-semibold">seconds</div>
            </div>
            <div className="dark:bg-[#141414] p-6 rounded-lg shadow-md mt-5">
                <h2 className="text-xl font-semibold mb-4">World Animal Day: Celebrating and Protecting Our Animal Friends</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <span className="font-semibold">What is World Animal Day?</span> World Animal Day is an international day of action for animal rights and welfare celebrated annually on October 4th. It aims to raise awareness about the welfare of animals, promote compassion towards animals, and encourage action to protect their rights.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <span className="font-semibold">History and Significance:</span> World Animal Day was established in 1931 at a convention of ecologists in Florence, Italy, as a way of highlighting the plight of endangered species. Since then, it has grown into a global movement celebrated in various countries around the world.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <span className="font-semibold">Why is it Important?</span> World Animal Day serves as a reminder of the importance of treating animals with kindness, respect, and empathy. It provides an opportunity for individuals, organizations, and communities to come together to advocate for the well-being of animals and address issues such as animal cruelty, habitat destruction, and species extinction.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <span className="font-semibold">Celebrations and Activities:</span> On World Animal Day, people participate in a wide range of activities to celebrate and protect animals. These activities may include awareness campaigns, fundraising events, pet adoption drives, volunteer work, and legislative advocacy.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <span className="font-semibold">Celebrating World Animal Day in Turkey:</span> In Turkey, World Animal Day is celebrated with various events and activities organized by animal welfare organizations, environmental groups, and concerned citizens. These may include adoption events, awareness campaigns, and community outreach programs aimed at promoting compassion towards animals and addressing animal welfare issues in the country.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Conclusion:</span> World Animal Day is a time to reflect on our relationship with animals and take action to protect and preserve their rights. By coming together to celebrate and advocate for animals, we can create a better world for both humans and animals alike.
                </p>
            </div>
        </div>
    );
};

export default AnimalProtectionDayCountdown;
