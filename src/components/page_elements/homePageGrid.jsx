import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
import ProgressCard from './progressCard';
import TableScrollArea from './tableScrollArea';


const PRIMARY_COL_HEIGHT = rem(300);

export default function LeadGrid() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md">
      <SimpleGrid spacing="lg">
        <TableScrollArea />
        <Grid gutter="md">
          <Grid.Col>
            <ProgressCard />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}