import type { NextPage } from "next";
import { useEffect, useState } from "react";
// Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Filler, Title, Tooltip, Legend);
import { Bar } from "react-chartjs-2";

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

    // lengths of words, function to return list of         !! TO DO = CHECK IF REALLY WORKING RIGHT !!
    function returnlengths(str: String, count?: boolean | null) {
        const words = separateToWords(str);
        var lengths_count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var lengths_percentage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (words) {
            const allwords = countWords(str);
            for (var i = 0; i < words.length; i++) {
                if (words[i].length > 13) {
                    lengths_count[13]++;
                } else {
                    lengths_count[words[i].length - 1]++;
                }
            }
            for (var i = 0; i < lengths_count.length; i++) {
                lengths_percentage[i] = Math.round((lengths_count[i] / allwords) * 10000) / 100;
            }
        }
        if (count) {
            return lengths_count;
        }
        return lengths_percentage;
    }
    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Word length Percentage Distribution",
                font: { size: 25 },
            },
            tooltip: {
                callbacks: {
                    // beforeTitle: function(context: any) {
                    //     let beforeTitle = context.dataset.beforeTitle;
                    //     beforeTitle = "test";
                    //     return beforeTitle;
                    // },
                    label: function (context: any) {
                        let label = context.dataset.label || "";
                        if (context.parsed.y !== null) {
                            const count = Math.round((context.parsed.y / 100) * countWords(text));
                            label += context.parsed.y + "% = " + count + ` ${count >= 2 ? "words" : "word"}`;
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value: any, index: any, ticks: any) {
                        return value + "%";
                    },
                },
            },
        },
    };
    // const calculateAverage = (array: number[]): number => {
    function calculateAverage(array: number[], str: string) {
        // var words = separateToWords(text);
        var regex = /[\p{L}]+/gu;
        var words = str.match(regex);
        let sum = 0;
        if (words) {
            for (let i = 0; i < words.length; ++i) {
                sum += words[i].length;
            }
            return Math.round((sum / countWords(str)) * 100) / 100;
        } else {
            return 0;
        }
    }

    // reading speed 250wpm, speaking spead 150wpm
    function timeWords(str: string, wpm: number) {
        const words = countWords(str);
        const minutes = Math.floor(words / wpm);
        const seconds = Math.round((words % wpm) / (wpm / 60));
        return minutes + " minutes and " + seconds + " seconds";
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
            <div className="bar">
                <Bar
                    data={{
                        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, "14+"],
                        datasets: [
                            {
                                data: returnlengths(text),
                                backgroundColor: [
                                    "rgba(255, 99, 132, 0.2)",
                                    "rgba(255, 159, 64, 0.2)",
                                    "rgba(255, 205, 86, 0.2)",
                                    "rgba(75, 192, 192, 0.2)",
                                    "rgba(54, 162, 235, 0.2)",
                                    "rgba(153, 102, 255, 0.2)",
                                    "rgba(201, 203, 207, 0.2)",
                                ],
                                borderColor: [
                                    "rgb(255, 99, 132)",
                                    "rgb(255, 159, 64)",
                                    "rgb(255, 205, 86)",
                                    "rgb(75, 192, 192)",
                                    "rgb(54, 162, 235)",
                                    "rgb(153, 102, 255)",
                                    "rgb(201, 203, 207)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    height={300}
                    options={options}
                />
                <p>
                    Average lengths: {calculateAverage(returnlengths(text, true), text)}, Median: {}
                </p>
                <p>Average reading time: {timeWords(text, 250)}</p>
                <p>Average speaking time: {timeWords(text, 150)}</p>
            </div>
        </section>
    );
};

export default Home;
