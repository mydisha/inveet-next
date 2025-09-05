<?php

namespace App\Services;

use App\Repositories\FeedbackRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class FeedbackService implements BaseServiceInterface
{
    protected $feedbackRepository;

    public function __construct(FeedbackRepository $feedbackRepository)
    {
        $this->feedbackRepository = $feedbackRepository;
    }

    public function getAll(array $filters = [])
    {
        return $this->feedbackRepository->getWithFilters($filters)->get();
    }

    public function findById(int $id)
    {
        return $this->feedbackRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->feedbackRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->feedbackRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->feedbackRepository->delete($id);
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        return $this->feedbackRepository->getWithFilters($filters)->paginate($perPage);
    }

    /**
     * Get recommended feedbacks
     */
    public function getRecommended()
    {
        return $this->feedbackRepository->getRecommended();
    }

    /**
     * Get feedbacks for landing page
     */
    public function getForLanding()
    {
        return $this->feedbackRepository->getForLanding();
    }

    /**
     * Get feedback statistics
     */
    public function getStatistics()
    {
        return $this->feedbackRepository->getStatistics();
    }

    /**
     * Toggle feedback recommendation
     */
    public function toggleRecommendation(int $feedbackId)
    {
        $feedback = $this->findById($feedbackId);
        if ($feedback) {
            $feedback->is_recommended = !$feedback->is_recommended;
            $feedback->save();
            return $feedback;
        }
        return false;
    }

    /**
     * Toggle feedback show on landing
     */
    public function toggleShowLanding(int $feedbackId)
    {
        $feedback = $this->findById($feedbackId);
        if ($feedback) {
            $feedback->show_on_landing = !$feedback->show_on_landing;
            $feedback->save();
            return $feedback;
        }
        return false;
    }
}
