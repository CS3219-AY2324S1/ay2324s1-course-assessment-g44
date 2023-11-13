import { ActionIcon, Box, useComputedColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useMantineColorScheme } from "@mantine/core";

function LightModeAndDarkModeButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() => {
        setColorScheme(computedColorScheme === "light" ? "dark" : "light");
      }}
      variant="default"
      size="xl"
    >
      {computedColorScheme === "light" ? <IconMoon /> : <IconSun />}
    </ActionIcon>
  );
}

export default LightModeAndDarkModeButton;
