import { Text, Progress, Card } from '@mantine/core';




export default function ProgressCard(props) {
  const completedNumber = props.completedNumber;
  const totalNumber = props.questionsLength;
  
  return (
    <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        Questions completed
      </Text>
      <Text fz="lg" fw={500}>
        {completedNumber} / {totalNumber}
      </Text>
      <Progress value={(completedNumber / totalNumber) * 100} mt="md" size="lg" radius="xl" />
    </Card>
  );
}