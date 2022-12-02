import Snackbar from '@mui/material/Snackbar';


interface Props {
  focus?: {
    on: boolean,
    message: string
  },
  className?: any,
  vertical: "top" | "bottom",
  horizontal: "left" | "center" | "right"
}

export default function CustomSnackBar({
  focus, className,
  vertical, horizontal
}: Props) {

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={focus?.on}
        message={focus?.message}
        key={vertical + horizontal}
      />
    </div>
  );
}