import { Card, Container, Image, Text, Badge, Button, Group, Grid, SegmentedControl, SimpleGrid, Space, rem, Title, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function TagMenu() {
    const PRIMARY_COL_HEIGHT = rem(300);
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
    
    const handleSubmit = () => {
        return;
    }
    
    const form = useForm({
        initialValues: {
          completeFilter: 'any',
          difficultyFilter: 'any',
          titleFilter: '',
          categoryFilter: '',
        },
    
        validate: {
          title: (value) => (existingQuestions.some((existingQuestion) => String(existingQuestion.title).toLowerCase() == String(value).toLowerCase()) ? "A question with this title already exists!" : null),
        },
      });



    return (
            <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.onReset}>
                <Card withBorder fullWidth>
                    <Text size="md" fw={500} ta="center">Tags menu</Text>
                    <Space h="md" />
                    <SimpleGrid spacing="lg">
                    <Grid gutter="md">
                        <Grid.Col span={6}>
                        <Card withBorder>
                        <Text size="md" fw={500} >Completion Status</Text>
                        <Space h="sm" />
                            <SegmentedControl
                            required
                            fullwidth
                            size="sm"
                            data={[
                                { label: 'Any', value: 'any' },
                                { label: 'Completed', value: 'completed' },
                                { label: 'Incomplete', value: 'incomplete' },
                            ]}
                            transitionDuration={300}
                            transitionTimingFunction="linear"
                            {...form.getInputProps('difficultyFilter')}
                            />
                        </Card>
                        </Grid.Col>
                        <Grid.Col span={6}>
                        <Card withBorder>
                        <Text size="md" fw={500} >Difficulty</Text>
                        <Space h="sm" />
                            <SegmentedControl
                            required
                            fullwidth
                            size="sm"
                            data={[
                                { label: 'Any', value: 'any' },
                                { label: 'Easy', value: 'easy' },
                                { label: 'Medium', value: 'medium' },
                                { label: 'Hard', value: 'hard' },
                            ]}
                            transitionDuration={300}
                            transitionTimingFunction="linear"
                            {...form.getInputProps('difficultyFilter')}
                            />
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={6}>
                        <Card withBorder>
                        <Text size="md" fw={500} >Title Keywords</Text>
                        <Space h="sm" />
                        <TextInput
                            size='md'
                            placeholder="Leave empty to search any title!"
                            {...form.getInputProps('title')}
                        />
                        </Card>
                        </Grid.Col>

                        <Grid.Col span={6}>
                        <Card withBorder>
                        <Text size="md" fw={500} >Category Keywords</Text>
                        <Space h="sm" />
                        <TextInput
                            size='md'
                            placeholder="Leave empty to search any category!"
                            {...form.getInputProps('category')}
                        />
                        </Card>
                        </Grid.Col>

                    </Grid>
                    </SimpleGrid>
                </Card>
           
               


            <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Norway Fjord Adventures</Text>
            <Badge color="pink" variant="light">
                On Sale
            </Badge>
            </Group>

            <Text size="sm" c="dimmed">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
            </Text>

            <Button variant="light" color="grape" type="submit" fullWidth mt="md">Submit</Button>
            </form>
        );
        }

export default TagMenu;