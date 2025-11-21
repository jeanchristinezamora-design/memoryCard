
export const Card = ({ card = {}, onClick = () => {} }) => {
  const classes = ["card"]
  if (card.flipped) classes.push("flipped")
  if (card.matched) classes.push("matched")

  return (
    <div
      className={classes.join(" ")}
      onClick={() => {
        if (!card.flipped && !card.matched) onClick(card.id)
      }}
    >
      <div className="card-front">?</div>
      <div className="card-back">{card.emoji}</div>
    </div>
  )
}