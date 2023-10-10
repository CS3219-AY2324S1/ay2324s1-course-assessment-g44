import { Text, Progress, Card } from '@mantine/core';




export default function ProgressCard() {
  return (
    <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Questions completed
      </Text>
      <Text fz="lg" fw={500}>
        0 / 20 questions
      </Text>
      <Progress value={10} mt="md" size="lg" radius="xl" />
    </Card>
  );
}