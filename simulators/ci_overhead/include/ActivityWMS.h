/**
 * Copyright (c) 2021. The WRENCH Team.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

#ifndef ACTIVITY_WMS_H
#define ACTIVITY_WMS_H

#include <wrench-dev.h>

namespace wrench {

    class Simulation;

    class ActivityWMS : public WMS {
    public:
        ActivityWMS(const std::set<std::shared_ptr<ComputeService>> &compute_services,
                    const std::set<std::shared_ptr<StorageService>> &storage_services,
                    const std::string &hostname);

        void processEventStandardJobCompletion(std::shared_ptr<StandardJobCompletedEvent>) override;

    private:
        int main() override;
    };
};

#endif
