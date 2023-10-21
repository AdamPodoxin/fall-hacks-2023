import '../styles/buttonHero.css'

interface Props {
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }
  
  export default function Button({
    onClick,
  }: React.PropsWithChildren<Props>) {
    return (
      <button
        onClick={onClick}
        className="signIn"
      >
        {"Sign In"}
      </button>
    );
  }