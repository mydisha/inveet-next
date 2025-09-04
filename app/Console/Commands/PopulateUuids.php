<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Wedding;
use App\Models\Package;
use App\Models\Order;
use App\Models\Theme;
use App\Models\SpecialInvitation;
use Illuminate\Support\Str;

class PopulateUuids extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:populate-uuids';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate existing records with UUIDs for security';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting UUID population...');

        // Populate Users
        $this->populateModelUuids(User::class, 'user_uuid', 'Users');

        // Populate Weddings
        $this->populateModelUuids(Wedding::class, 'wedding_uuid', 'Weddings');

        // Populate Packages
        $this->populateModelUuids(Package::class, 'package_uuid', 'Packages');

        // Populate Orders
        $this->populateModelUuids(Order::class, 'order_uuid', 'Orders');

        // Populate Themes
        $this->populateModelUuids(Theme::class, 'theme_uuid', 'Themes');

        // Populate Special Invitations
        $this->populateModelUuids(SpecialInvitation::class, 'special_invitation_uuid', 'Special Invitations');

        $this->info('UUID population completed successfully!');
    }

    /**
     * Populate UUIDs for a specific model
     */
    private function populateModelUuids($modelClass, $uuidColumn, $modelName)
    {
        $this->info("Processing {$modelName}...");

        try {
            $records = $modelClass::whereNull($uuidColumn)->get();
            $count = 0;

            foreach ($records as $record) {
                $record->update([$uuidColumn => Str::uuid()]);
                $count++;
            }

            $this->info("Updated {$count} {$modelName} records with UUIDs");
        } catch (\Exception $e) {
            $this->error("Error processing {$modelName}: " . $e->getMessage());
            // Try without soft deletes
            try {
                $records = $modelClass::withoutGlobalScopes()->whereNull($uuidColumn)->get();
                $count = 0;

                foreach ($records as $record) {
                    $record->update([$uuidColumn => Str::uuid()]);
                    $count++;
                }

                $this->info("Updated {$count} {$modelName} records with UUIDs (without soft deletes)");
            } catch (\Exception $e2) {
                $this->error("Failed to process {$modelName}: " . $e2->getMessage());
            }
        }
    }
}
