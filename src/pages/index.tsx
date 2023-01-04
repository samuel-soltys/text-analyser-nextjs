import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
    const [text, setText] = useState("");
    const [text_search, setText_search] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setText(e.target.value);
    }
    function handleChange_search(e: React.ChangeEvent<HTMLInputElement>) {
        setText_search(e.target.value);
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
    function countSpecificCharacter(str: String, char: string) {
        if (char) {
            return str.split(char).length - 1;
        } else {
            return 0;
        }
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

    // Syllables
    function countSyllablesWord(word: String) {
        word = word.toLowerCase();
        if (word.length <= 3) {
            return 1;
        }
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
        word = word.replace(/^y/, "");
        if (word.match(/[aeiouy]{1,2}/g)) {
            return word.match(/[aeiouy]{1,2}/g)!.length;
        } else {
            return 0;
        }
    }
    function countAllSyllables(str: String) {
        var words = separateToWords(str);
        var syllables = 0;
        if (words) {
            for (var i = 0; i < words.length; i++) {
                syllables += countSyllablesWord(words[i]);
            }
        } else {
            return 0;
        }
        return syllables;
    }

    // Complex words
    function countComplexWords(str: String) {
        var words = separateToWords(str);
        var complex = 0;
        if (words) {
            for (var i = 0; i < words.length; i++) {
                if (countSyllablesWord(words[i]) >= 3) {
                    complex++;
                }
            }
        } else {
            return 0;
        }
        return complex;
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
            <p>Complex Words (3 or more syllables): {countComplexWords(text)}</p>
            <p>Syllables (English): {countAllSyllables(text)}</p>
            <br />
            <p>Count occurance of character/sequence of characters: </p>
            <input type="text" onChange={handleChange_search} />
            <p>{countSpecificCharacter(text, text_search)}</p>
            <br />
        </section>
    );
};

export default Home;
