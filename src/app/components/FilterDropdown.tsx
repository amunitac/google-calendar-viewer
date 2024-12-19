const FilterDropdown = ({ value, onChange }: { value: string | null; onChange: (value: string | null) => void }) => {
  return (
    <select
      className="border border-gray-300 rounded-md p-2"
      value={value || ''}
      onChange={(e) => onChange(e.target.value || null)}
    >
      <option value="">All</option>
      <option value="birthday">Birthday</option>
      <option value="recurring">Recurring</option>
      <option value="allDay">All Day</option>
      <option value="meeting">Meetings</option>
      <option value="task">Tasks</option>
      <option value="other">Others</option>
    </select>
  );
};

export default FilterDropdown;