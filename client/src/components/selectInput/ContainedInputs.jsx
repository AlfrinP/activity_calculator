import { Select, TextInput } from "@mantine/core";
import classes from "./ContainedInput.module.css";

export function ContainedInputs() {
  return (
    <>
      <Select
        mt="md"
        comboboxProps={{ withinPortal: true }}
        data={["React", "Angular", "Svelte", "Vue"]}
        placeholder="Pick one"
        label="Your favorite library"
        classNames={classes}
      />
    </>
  );
}
