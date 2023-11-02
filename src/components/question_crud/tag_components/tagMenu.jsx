import { Card, Container, Image, Text, Badge, Button, Group, Grid, SegmentedControl, SimpleGrid, Space, rem, Title, TextInput, Blockquote } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import TagQuestions from '../../../pages/TagQuestions';
import { NOFILTER } from './taggingProcess';

function TagMenu(props) {

    const filters = {
        completeFilter: "any",
        difficultyFilter: "any",
        titleFilter: "",
        categoryFilter: "",
    };

    const PRIMARY_COL_HEIGHT = rem(300);
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
    
    const handleSubmit = (values) => {
        filters.completeFilter = values.completeFilter,
        filters.difficultyFilter = values.difficultyFilter,
        filters.titleFilter = values.titleFilter,
        filters.categoryFilter = values.categoryFilter,

        props.getFilterFunction(filters);
    }

    const handleReset = () => {
        props.getFilterFunction(NOFILTER);
    }

    
    const form = useForm({
        initialValues: {
          completeFilter: 'any',
          difficultyFilter: 'any',
          titleFilter: '',
          categoryFilter: '',
        },

    
        // validate: {
        //   title: (value) => (existingQuestions.some((existingQuestion) => String(existingQuestion.title).toLowerCase() == String(value).toLowerCase()) ? "A question with this title already exists!" : null),
        // },
      });


    return (
        <>
            <Space h="md"/>
            <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.onReset} >
                <Card withBorder fullWidth>
                    <Text size="md" fw={500} ta="center">Tags menu</Text>
                    <Space h="md" />
                    <SimpleGrid spacing="lg">
                    <Grid align="center" gutter="md">
                        <Grid.Col span={6}>
                        <Card withBorder>
                        <Text size="md" fw={500} >Completion Status</Text>
                        <Space h="sm" />
                            <SegmentedControl
                            required
                            fullwidth
                            size="xs"
                            data={[
                                { label: 'Any', value: 'any' },
                                { label: 'Completed', value: 'completed' },
                                { label: 'Incomplete', value: 'incomplete' },
                            ]}
                            transitionDuration={300}
                            transitionTimingFunction="linear"
                            {...form.getInputProps('completeFilter')}
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
                            size="xs"
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
                            size='sm'
                            ref={props.filtersRef}
                            placeholder="Leave empty to search any title!"
                            {...form.getInputProps('titleFilter')}
                        />
                        </Card>
                        </Grid.Col>

                        <Grid.Col span={6}>
                        <Card withBorder>
                        <Text size="md" fw={500} >Category Keywords</Text>
                        <Space h="sm" />
                        <TextInput
                            size='sm'
                            placeholder="Leave empty to search any category!"
                            {...form.getInputProps('categoryFilter')}
                        />
                        </Card>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Button variant="light" color="grape" type="submit" fullWidth mt="lg">Submit Tags</Button>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Button variant="light" color="light gray" type="reset" fullWidth mt="lg" onClick={handleReset}>Reset Active Tags</Button>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Button variant="light" color="gray" type="reset" fullWidth mt="lg">Reset Selection</Button>
                        </Grid.Col>

                    </Grid>
                    </SimpleGrid>
                    
                </Card>
           
        
            </form>
            </>



        );
        }

export default TagMenu;