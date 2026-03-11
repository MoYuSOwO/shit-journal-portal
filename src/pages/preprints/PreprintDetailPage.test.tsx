import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { API } from '../../lib/api';
import { renderWithProviders } from '../../test/renderWithProviders';
import { AuthorDashboard } from '../dashboard/AuthorDashboard';
import { PreprintDetailPage } from './PreprintDetailPage';

vi.mock('./PdfViewer', () => ({
  PdfViewer: () => <div>Mock PDF Viewer</div>,
}));

async function loginAsReader() {
  await API.auth.login('reader@shitjournal.org', 'mock123456');
}

describe('PreprintDetailPage favorites and ratings', () => {
  it('disables favorites while keeping rating flow available', async () => {
    await loginAsReader();
    const user = userEvent.setup();

    const detailView = renderWithProviders(<PreprintDetailPage />, {
      initialEntries: ['/preprints/art-sediment-1'],
      routes: [{ path: '/preprints/:id', element: <PreprintDetailPage /> }],
    });

    await waitFor(() => {
      expect(screen.getByText('Negative Externalities of Over-Flushing Draft Manuscripts')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Unavailable / 收藏暂不可用' })).toBeDisabled();

    await user.click(screen.getByTitle('4 / 5'));

    await waitFor(() => {
      expect(screen.getByText('Your rating: 4/5')).toBeInTheDocument();
    });

    detailView.unmount();

    renderWithProviders(<AuthorDashboard />, {
      initialEntries: ['/dashboard'],
      routes: [{ path: '/dashboard', element: <AuthorDashboard /> }],
    });

    await waitFor(() => {
      expect(screen.getByText('My Excretions')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'Favorites / 我的收藏' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Rated / 我的评价' }));

    await waitFor(() => {
      expect(screen.getByText('Negative Externalities of Over-Flushing Draft Manuscripts')).toBeInTheDocument();
    });

    expect(screen.getAllByText('Rated 4/5 / 已评价 4/5').length).toBeGreaterThan(0);
  });

  it('opens a report dialog that requires a reason before submitting', async () => {
    await loginAsReader();
    const user = userEvent.setup();

    renderWithProviders(<PreprintDetailPage />, {
      initialEntries: ['/preprints/art-sediment-1'],
      routes: [{ path: '/preprints/:id', element: <PreprintDetailPage /> }],
    });

    await waitFor(() => {
      expect(screen.getByText('Negative Externalities of Over-Flushing Draft Manuscripts')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: 'Report / 举报' }));

    expect(screen.getByRole('heading', { name: /举报这篇文章 \/ Report this article/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit Report / 提交举报' })).toBeDisabled();

    await user.type(
      screen.getByPlaceholderText('请填写举报原因，例如：人身攻击、恶意刷屏、明显违规内容等'),
      '存在明显违规内容，需要管理员介入处理',
    );

    await user.click(screen.getByRole('button', { name: 'Submit Report / 提交举报' }));

    await waitFor(() => {
      expect(screen.getByText('举报已提交，我们会尽快审核。/ Report submitted successfully.')).toBeInTheDocument();
    });

    expect(screen.queryByRole('heading', { name: /举报这篇文章 \/ Report this article/i })).not.toBeInTheDocument();
  });
});
