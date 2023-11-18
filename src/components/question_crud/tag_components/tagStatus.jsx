import { Card, Text, Table, List, ThemeIcon, Space, Grid } from '@mantine/core';
import { PopoverPaper } from '@mui/material';
import { IconCircleCheck, IconCircleDashed, IconChecks, IconBook, IconTag } from '@tabler/icons-react';
import { NOFILTER } from './taggingProcess';


function TagStatus(props) {
 

    const hasNoFilters = () => {
        return (props.filters.completeFilter === NOFILTER.completeFilter && props.filters.difficultyFilter === NOFILTER.difficultyFilter
            && props.filters.titleFilter === NOFILTER.titleFilter && props.filters.categoryFilter === NOFILTER.categoryFilter);
    }

    if (hasNoFilters()) {
        return (
            <Card withBorder color='blue'>
            <Text fw={500}>Active Tags: None</Text>
            </Card>
        );
    }


    return (
        <Card withBorder color='blue'>
            <Text fw={500}>Active Tags:</Text>
            <Space h="md" />
            <Grid gutter="md">
            <Grid.Col>
                <List spacing="xs" size="sm">
                    {props.filters.completeFilter !== "any" && <List.Item icon={
                        <ThemeIcon color="grape" size={24} radius="xl">
                        <IconChecks size={16} />
                      </ThemeIcon>
                    }> {props.filters.completeFilter.charAt(0).toUpperCase() + props.filters.completeFilter.slice(1)}</List.Item>}

                    {props.filters.difficultyFilter !== "any" && <List.Item icon={
                        <ThemeIcon color="brown" size={24} radius="xl">
                        <IconCircleDashed size={16} />
                      </ThemeIcon>
                    }> {props.filters.difficultyFilter.charAt(0).toUpperCase() + props.filters.difficultyFilter.slice(1)}</List.Item>}   
                </List>
                </Grid.Col>
                <Grid.Col>
                <List spacing="xs" size="sm">
                    {props.filters.titleFilter !== "" && <List.Item icon={
                        <ThemeIcon color="green" size={24} radius="xl">
                        <IconBook size={16} />
                    </ThemeIcon>
                    }> Title: {props.filters.titleFilter}</List.Item>}
                    {props.filters.categoryFilter !== "" && <List.Item icon={
                        <ThemeIcon color="pink" size={24} radius="xl">
                        <IconTag size={16} />
                    </ThemeIcon>
                    }> Category: {props.filters.categoryFilter}</List.Item>}
                </List>
                </Grid.Col>
                </Grid>
        </Card>
    )
}

export default TagStatus;