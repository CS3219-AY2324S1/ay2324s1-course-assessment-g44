import { Card, Container, Image, Text, Badge, Button, Group, Grid, SegmentedControl, SimpleGrid, Space, rem, Title, TextInput, Blockquote, Select } from '@mantine/core';
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
            <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.onReset} >
                <Card withBorder fullWidth>
                    <Text size="md" fw={500}>Set Tags:</Text>
                    <Space h="md" />
                        <Space h="sm" />
                        <Grid>
                            <Grid.Col span={6}>
                            <Select
                            allowDeselect={false}
                            label="Completion"
                            size="sm"
                            defaultValue={"any"}
                            data={[
                                { value: 'any', label: 'Any' },
                                { value: 'completed', label: 'Completed' },
                                { value: 'incomplete', label: 'Incomplete' },
                            ]}
                            {...form.getInputProps('completeFilter')}
                            />
                            </Grid.Col>
                        <Grid.Col span={6}>
                        <Select
                            allowDeselect={false}
                            size="sm"
                            defaultValue={"any"}
                            label="Difficulty"
                            data={[
                                { value: 'any', label: 'Any' },
                                { value: 'easy', label: 'Easy' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'hard', label: 'Hard' },
                            ]}
                            {...form.getInputProps('difficultyFilter')}
                            />   
                        </Grid.Col>
                        <Grid.Col span={12}>
                        <TextInput
                            label="Title"
                            size='sm'
                            placeholder="Leave empty to search any title!"
                            {...form.getInputProps('titleFilter')}
                        />
                        </Grid.Col>
                        <Grid.Col span={12}>
                        <TextInput
                            size='sm'
                            label="Category"
                            placeholder="Leave empty to search any category!"
                            {...form.getInputProps('categoryFilter')}
                        />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Button variant="light" color="grape" type="submit" fullWidth mt="sm">Search</Button>
                        </Grid.Col>
                        
                        <Grid.Col span={6}>
                            <Button variant="light" color="light gray" type="reset" fullWidth mt="sm" onClick={handleReset}>Reset Active Tags</Button>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Button variant="light" color="gray" type="reset" fullWidth mt="sm">Reset Selection</Button>
                        </Grid.Col>
                        </Grid>
                </Card>
           
        
            </form>
            </>



        );
        }

export default TagMenu;