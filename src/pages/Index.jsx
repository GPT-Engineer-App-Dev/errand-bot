import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, useColorModeValue, Heading, Flex } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle, FaCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTask = { id: Date.now(), text: input, isCompleted: false };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={8} maxW="500px" mx="auto">
      <Heading mb={6} textAlign="center">Todo App</Heading>
      <Flex mb={4}>
        <Input
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          mr={2}
        />
        <Button onClick={handleAddTask} colorScheme="blue">Add</Button>
      </Flex>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" bg={useColorModeValue('gray.100', 'gray.700')} p={3} borderRadius="md">
            <Flex alignItems="center">
              <ListIcon as={task.isCompleted ? FaCheckCircle : FaCircle} color={task.isCompleted ? 'green.500' : 'gray.500'} cursor="pointer" onClick={() => toggleTaskCompletion(task.id)} />
              <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.text}</span>
            </Flex>
            <IconButton icon={<FaTrash />} isRound="true" onClick={() => handleDeleteTask(task.id)} aria-label="Delete task" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;