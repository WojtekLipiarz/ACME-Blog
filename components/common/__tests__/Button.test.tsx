import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// styles
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@styles/theme';
// common
import { Button } from '@common/Button';

describe('Button Component', () => {
  it('renders correctly and reacts to click', async () => {
    const onClick = jest.fn();

    render(
      <ThemeProvider theme={lightTheme}>
        <Button onClick={onClick}>Hello</Button>
      </ThemeProvider>
    );

    const buttonElement = screen.getByRole('button', { name: /hello/i });
    await userEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
