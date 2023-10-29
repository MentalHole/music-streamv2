"use client";
import natural, { WordTokenizer, SentimentAnalyzer } from "natural";

interface SearchContentProps {
    userText: String;
}

const ChatContent: React.FC<SearchContentProps> = ({ userText }) => {
    // Create instances
    const tokenizer: WordTokenizer = new natural.WordTokenizer();
    const analyzer: SentimentAnalyzer = new natural.SentimentAnalyzer(
        "English",
        natural.PorterStemmer,
        "afinn"
    );

    // Handle user input
    const handleUserInput = (userText: string): number => {
        // Tokenize the user's input
        const tokens: string[] = tokenizer.tokenize(userText) as string[];
        // Check for null (if needed)
        if (tokens === null) {
            throw new Error("Tokenization failed");
        }
        // Analyze sentiment
        const result: number = analyzer.getSentiment(tokens);
        return result;
    };

    // Example user input
    const userInput: string = "I feel happy and relaxed";
    const sentimentResult: number = handleUserInput(userInput);

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">Sentiment result: {sentimentResult}</div>
    );
};

export default ChatContent;
