import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
    const [text, setText] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setText(e.target.value);
    }

    // Words
    function countWords(str: String) {
        var regex = /[\p{L}0-9-']+/gu;
        var words = str.match(regex);
        return words ? words.length : 0;
    }
    
    return (
        <section>
            <textarea className="text-prompt" value={text} onChange={handleChange} />
            <br />
            <br />
            <p>Words: {countWords(text)}</p>
        </section>
    );
};

export default Home;
