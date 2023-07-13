import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css"
import "../../styles/home.css";

export const TransactionCard = ({ item }) => {
    const { store, actions } = useContext(Context);
    const [isCollapsed, setIsCollapsed] = useState(item.id !== 1);

    useEffect(() => {
        actions.getTransaction();
    }, []);

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="card">
            <div className="card-header bg-white" onClick={handleCollapse}>
                <h5 className="mb-0">
                    <button
                        className="btn link-like"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${item.id}`}
                        aria-expanded={isCollapsed ? "true" : "false"}
                        aria-controls={`collapse-${item.id}`}
                    >
                        Order Nº {item.id}
                    </button>
                </h5>
            </div>
            <div
                id={`collapse-${item.id}`}
                className={`collapse ${isCollapsed ? "" : "show"}`}
                aria-labelledby={`heading-${item.id}`}
                data-bs-parent="#accordion"
            >
                <div className="card-body">
                    <p className="card-text text-start mb-1">
                        Date Created: {item.transaction_created}
                    </p>
                    <p className="card-text text-start">
                        Total Order Price: {parseFloat(item.total_price.toFixed(2))}€
                    </p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Book</th>
                                <th>Author</th>
                                <th>Format</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.items.map((transactionItem) => (
                                <tr key={transactionItem.id}>
                                    <td>{actions.capitalizeWords(transactionItem.book_id.title)}</td>
                                    <td>{transactionItem.book_id.author}</td>
                                    <td>{transactionItem.book_format_id.book_format}</td>
                                    <td>{transactionItem.book_format_id.book_price} €</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
