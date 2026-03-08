import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PreprintListPage } from './PreprintListPage';
import { renderWithProviders } from '../../test/renderWithProviders';

describe('PreprintListPage', () => {
  it('renders mocked latrine articles from MSW', async () => {
    renderWithProviders(<PreprintListPage />, {
      initialEntries: ['/preprints?zone=latrine'],
      routes: [{ path: '/preprints', element: <PreprintListPage /> }],
    });

    await waitFor(() => {
      expect(
        screen.getByText('Benchmarking Latrine Throughput Under Conference Deadline Stress'),
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/Dr\. Flush/i)).toBeInTheDocument();
  });

  it('uses a compact discipline trigger and renders the custom menu', async () => {
    renderWithProviders(<PreprintListPage />, {
      initialEntries: ['/preprints?zone=septic'],
      routes: [{ path: '/preprints', element: <PreprintListPage /> }],
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '全部 / All' })).toBeInTheDocument();
    });

    const disciplineTrigger = screen.getByRole('button', { name: '全部 / All' });
    expect(disciplineTrigger).toHaveClass(
      'ui-select-trigger',
    );

    fireEvent.click(disciplineTrigger);

    expect(screen.getByRole('listbox', { name: 'Discipline / 学科' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '交叉 / Interdisciplinary' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Newest / 最新' })).toHaveClass(
      'px-1',
      'py-[6px]',
      'text-[10px]',
    );
  });
});
