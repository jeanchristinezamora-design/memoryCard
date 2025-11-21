export const GameHeader = ({ Yes = 0, No = 0 }) => {
    return (
        <div className="game-header">
            <h1>BON BAYOT</h1>
            <div className="stats">
                <div className="stat-item">
                    <span className="stat-label">Yes</span>
                    <span className="stat-value">{Yes}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">No</span>
                    <span className="stat-value">{No}</span>
                </div>
            </div>
        </div>
    )
}