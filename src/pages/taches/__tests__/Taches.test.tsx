import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/test-utils';
import Taches from '../Taches';

describe('Taches Page', () => {
  it('should render page title', () => {
    render(<Taches />);
    expect(screen.getByRole('heading', { name: /mes tâches/i })).toBeInTheDocument();
  });

  it('should render TodoList component', () => {
    render(<Taches />);
    // TodoList has its own heading
    expect(screen.getByRole('heading', { name: /liste de tâches/i })).toBeInTheDocument();
  });

  it('should render KanbanBoard component', () => {
    render(<Taches />);
    // KanbanBoard should be present (checking for typical content)
    expect(screen.getByText('TODO')).toBeInTheDocument();
    expect(screen.getByText('DOING')).toBeInTheDocument();
    expect(screen.getByText('DONE')).toBeInTheDocument();
  });

  it('should have proper page structure', () => {
    render(<Taches />);

    const mainHeading = screen.getByRole('heading', { level: 1, name: /mes tâches/i });
    expect(mainHeading).toBeInTheDocument();
  });

  it('should display initial tasks from TodoList', () => {
    render(<Taches />);

    expect(screen.getByText("Configurer l'authentification")).toBeInTheDocument();
    expect(screen.getByText('Connecter Todoist')).toBeInTheDocument();
    expect(screen.getByText('Créer une sauvegarde automatique')).toBeInTheDocument();
  });

  it('should allow task interaction', async () => {
    render(<Taches />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });
});
