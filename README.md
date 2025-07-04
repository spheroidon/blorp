# Blorp

Blorp is a Discord bot built with [discord.js](https://discord.js.org/) and powered by Node.js. It is designed to be easy to configure and extend. Blorp is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).

## Features

- Built with TypeScript and Discord.js
- Slash command support
- Easy command deployment

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later recommended)
- npm (v9 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/spheroidon/blorp.git
   cd blorp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   * Copy `.env.example` to `.env`
   * Customize the values in `.env` as needed

4. Build the project:

   ```bash
   npm run build
   ```

5. Deploy commands to Discord:

   ```bash
   npm run deploy-cmds
   ```

6. Start the bot:

   ```bash
   npm run start
   ```

## Contributing

This is a personal project and contributions are closed. However, suggestions or feedback can be made using GitHub issues.

## License

This project is licensed under the [GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.html). See the [LICENSE](./LICENSE) file for details.
