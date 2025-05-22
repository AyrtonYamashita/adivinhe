import styles from "./styles.module.css";
type Props = React.ComponentProps<"input">;

export function Input({ ...rest }) {
  return <input type="text" className={styles.input} {...rest} />;
}
