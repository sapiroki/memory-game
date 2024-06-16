import React, { useState, useEffect } from 'react';
import Card from './Card';
import './App.css';

const generateCards = () => {
    const icons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍍', '🥝'];
    const cards = [...icons, ...icons].sort(() => Math.random() - 0.5);
    return cards.map((icon, index) => ({ id: index, icon, flipped: false, matched: false }));
};

const App = () => {
    const [cards, setCards] = useState(generateCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;

            if (cards[firstCard].icon === cards[secondCard].icon) {
                const newCards = cards.map(card =>
                    card.id === firstCard || card.id === secondCard
                        ? { ...card, matched: true }
                        : card
                );
                setCards(newCards);
                setFlippedCards([]);
            } else {
                setTimeout(() => {
                    const newCards = cards.map(card =>
                        card.id === firstCard || card.id === secondCard
                            ? { ...card, flipped: false }
                            : card
                    );
                    setCards(newCards);
                    setFlippedCards([]);
                }, 500);
            }
        }

        if (cards.every(card => card.matched)) {
            setCompleted(true);
        }
    }, [flippedCards, cards]);

    const handleCardClick = id => {
        if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) return;

        const newCards = cards.map(card =>
            card.id === id ? { ...card, flipped: true } : card
        );
        setCards(newCards);
        setFlippedCards([...flippedCards, id]);

        if (flippedCards.length === 0) {
            setMoves(moves + 1);
        }
    };

    const resetGame = () => {
        setCards(generateCards());
        setFlippedCards([]);
        setMoves(0);
        setCompleted(false);
    };

    return (
        <div className="game-container">
            {completed ? (
                <div className="game-over">
                    <h2>Game Over!</h2>
                    <p>Moves: {moves}</p>
                    <button onClick={resetGame}>Restart</button>
                </div>
            ) : (
                <div className="grid">
                    {cards.map(card => (
                        <Card key={card.id} card={card} onClick={handleCardClick} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
