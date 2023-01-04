import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
    const [text, setText] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setText(e.target.value);
    }

    // Words
    function separateToWords(str: String) {
        var regex = /[\p{L}0-9-']+/gu;
        var matches = str.match(regex);
        return matches;
    }
    function countWords(str: String) {
        var words = separateToWords(str);
        return words ? words.length : 0;
    }

    // Characters
    function countCharacters(str: String) {
        return str.length;
    }
    function countCharactersNoSpace(str: String) {
        var regex = /\S/g;
        var matches = str.split(regex);
        return matches ? matches.length - 1 : 0;
    }

    // Sentences
    function countSentences(str: String) {
        var regex = /[\p{L}0-9-')]+[.?!]/gu;
        var sentences = str.match(regex);
        return sentences ? sentences.length : 0;
    }
    
    return (
        <section>
            <textarea className="text-prompt" value={text} onChange={handleChange} />
            <br />
            <br />
            <p>Words: {countWords(text)}</p>
            <p>Characters with spaces: {countCharacters(text)}</p>
            <p>Characters without spaces: {countCharactersNoSpace(text)}</p>
            <p>Sentences: {countSentences(text)}</p>
        </section>
    );
};

export default Home;
