import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';


export default function Test() {


    const avatar = createAvatar(adventurer, {
        "seed": "Callie",
        "flip": true,
        "backgroundType": [],
        "earrings": [
            "variant06"
        ],
        "earringsProbability": 100,
        "eyebrows": [
            "variant15"
        ],
        "eyes": [
            "variant26"
        ],
        "features": [
            "birthmark"
        ],
        "featuresProbability": 100,
        "glasses": [
            "variant05"
        ],
        "glassesProbability": 100,
        "hair": [
            "short19"
        ],
        "hairColor": [
            "0e0e0e"
        ],
        "mouth": [
            "variant30"
        ],
        "skinColor": [
            "ecad80"
        ]
    });

    const svg = avatar.toString();

    return (
        <div className='w-48 h-48 flex flex-col items-center justify-center'>
            <img src={`data:image/svg+xml,${encodeURIComponent(svg)}`} alt="Avatar" />
        </div>
    );
}